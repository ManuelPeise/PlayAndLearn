using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Shared.Authorization
{

    

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method , AllowMultiple = true)]
    public class ApiKeyAttribute : AuthorizeAttribute
    {
        public string ApiKey
        {
            get => _apiKey;
            set
            {
                _apiKey = value;
            }
        }

       
        public string ModuleKey
        {
            get => _moduleKey;
            set
            {
                _moduleKey = value;
            }
        }

        private const string APIKEY = "api-key";
        private const string MODULEAPIKEY = "modul-api-key";
        private string _apiKey;
        private string _moduleKey;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            ExecuteValidation(context);
        }

        private void ExecuteValidation(AuthorizationFilterContext context)
        {
            var request = context.HttpContext.Request;

            request.Headers.TryGetValue(APIKEY, out var submittedApiKey);
            request.Headers.TryGetValue(APIKEY, out var userRight);

            // TODO implement userright check

            if (string.IsNullOrWhiteSpace(submittedApiKey))
            {
                request.HttpContext.Response.StatusCode = 401;
                request.HttpContext.Response.WriteAsync("Api Key was not provided ");

                context.Result = new UnauthorizedResult();

                return;
            }

            if (!_apiKey.Equals(submittedApiKey))
            {
                request.HttpContext.Response.StatusCode = 401;
                request.HttpContext.Response.WriteAsync("Api Key is not valid!");

                context.Result = new UnauthorizedResult();
            }
            else
            {
                request.HttpContext.Response.StatusCode = 200;
            }
        }
    }
    public class FileUploadAuthorization
    {
    }
}
