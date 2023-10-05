using BusinessLogic.Administration;
using BusinessLogic.Games;
using BusinessLogic.Import;
using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Web.Core.Bundles;

var corsPolicy = "CorsPolicy";

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddDbContext<AppDataContext>(options =>
{

    var connection = builder.Configuration.GetConnectionString("AppDataContext");

    options.UseMySQL(connection);
});

builder.Services.AddScoped<ILogRepository, LogRepository>();
builder.Services.AddScoped<IMemory, Memory>();
builder.Services.AddScoped<IFileImport, FileImport>();
builder.Services.AddScoped<IDatabaseMigrator, DatabaseMigrator>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 268435456;
});

builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(
        name: corsPolicy,
        p =>
        {
            p.WithHeaders("*");
            p.WithMethods("GET", "POST", "OPTIONS");
            p.WithOrigins(new[] { "*" });
        });
});

var app = builder.Build();

app.UseCors(corsPolicy);

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}

//if (!app.Environment.IsDevelopment())
//{
 //  app.UseHttpsRedirection();
//}

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var logService = scope.ServiceProvider.GetRequiredService<ILogRepository>();

AppScheduler.Configure(builder.Configuration, logService);

app.Run();
