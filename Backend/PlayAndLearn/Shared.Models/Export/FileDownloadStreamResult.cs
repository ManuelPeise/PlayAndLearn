using Microsoft.AspNetCore.Http;
using System.Net;
using System.Web.Http;

namespace Shared.Models.Export
{
    public class FileDownloadStreamResult : IHttpActionResult
    {
        private readonly string _fileName;
        private readonly MemoryStream _stream;
        private readonly HttpRequestMessage _requestMessage;
        private HttpResponseMessage? _responseMessage = null;
        private string fileName;

        public FileDownloadStreamResult(MemoryStream stream, HttpRequestMessage request, string fileName)
        {
            _stream = stream;
            _requestMessage = request;
            _fileName = fileName;
        }

      

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            _responseMessage = _requestMessage.CreateResponse(HttpStatusCode.OK);
            _responseMessage.Content = new StreamContent(_stream);
            _responseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            _responseMessage.Content.Headers.ContentDisposition.FileName = _fileName;
            _responseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return System.Threading.Tasks.Task.FromResult(_responseMessage);
        }
    }
}
