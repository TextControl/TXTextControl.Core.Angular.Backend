using System;
using Microsoft.AspNetCore.Mvc;
using backendangular.Models;

namespace backendangular.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TextControlController : ControllerBase
    {
        [HttpPost]
        [Route("MergeDocument")]
        public MergedDocument MergeDocument([FromBody] MergedDocument Document)
        {
            byte[] data;

            Customer customer = new Customer() { Firstname = "Klaus", Name = "Klaasen" };

            using (TXTextControl.ServerTextControl tx = new TXTextControl.ServerTextControl())
            {
                tx.Create();
                tx.Load(Convert.FromBase64String(Document.Document), TXTextControl.BinaryStreamType.InternalUnicodeFormat);

                TXTextControl.DocumentServer.MailMerge mm = new TXTextControl.DocumentServer.MailMerge();
                mm.TextComponent = tx;

                mm.MergeObject(customer);

                tx.Save(out data, TXTextControl.BinaryStreamType.InternalUnicodeFormat);

                return new MergedDocument() { Document = Convert.ToBase64String(data) };
            }
        }

        [HttpGet]
        [Route("LoadData")]
        public Customer[] LoadData()
        {
            return new Customer[] { new Customer() { Firstname = "Klaus", Name = "Klaasen" } };
        }
    }
}
