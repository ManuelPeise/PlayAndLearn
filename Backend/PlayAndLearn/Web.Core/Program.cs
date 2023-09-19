using BusinessLogic.Games;
using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;


var corsPolicy = "CorsPolicy";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(
        name: corsPolicy,
        p =>
    {
        p.AllowAnyHeader();
        p.AllowAnyMethod();
        p.AllowAnyOrigin();
    });
});

// Add services to the container.

builder.Services.AddDbContext<AppDataContext>(options =>
{

    var connection = builder.Configuration.GetConnectionString("AppDataContext");

    options.UseMySQL(connection);
});

// builder.Services.AddScoped<IGenericDbContextAccessor<EntityBase>, GenericDbContextAccessor<EntityBase>>();
builder.Services.AddScoped<IGameHandlerFactory, GameHandlerFactory>();
builder.Services.AddScoped<ILogRepository, LogRepository>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 268435456;
});

var app = builder.Build();

app.UseCors(corsPolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
