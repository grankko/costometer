using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CostOMeter.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(string listName)
        {
            // Serve the webpack-generated index.html from wwwroot
            var indexPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            
            if (System.IO.File.Exists(indexPath))
            {
                return PhysicalFile(indexPath, "text/html");
            }
            
            // Fallback to a simple message if webpack hasn't built the files yet
            return Content(@"
                <html>
                <head><title>CostOMeter</title></head>
                <body>
                    <h1>CostOMeter</h1>
                    <p>Please run 'npm run build' to build the frontend assets.</p>
                    <p>Or run 'npm run dev' for development mode.</p>
                </body>
                </html>", "text/html");
        }
    }
}
