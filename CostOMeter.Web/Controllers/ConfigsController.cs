using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CostOMeter.Web.Models;

namespace CostOMeter.Web.Controllers
{
    public class ConfigsController : Controller
    {
        private static List<CostConfiguration> _configurations = new();

        public IActionResult Index()
        {
            return View(_configurations);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(CostConfiguration configuration)
        {
            if (ModelState.IsValid)
            {
                configuration.Id = _configurations.Count + 1;
                _configurations.Add(configuration);
                return RedirectToAction(nameof(Index));
            }
            return View(configuration);
        }

        public IActionResult Details(int id)
        {
            var configuration = _configurations.Find(c => c.Id == id);
            if (configuration == null)
            {
                return NotFound();
            }
            return View(configuration);
        }

        [HttpGet]
        public IActionResult GetCosts(int id)
        {
            var configuration = _configurations.Find(c => c.Id == id);
            if (configuration == null)
            {
                return NotFound();
            }

            var costs = new Dictionary<string, decimal>
            {
                { "8h", configuration.Consultants.Sum(c => c.HourlyRate * 8) },
                { "16h", configuration.Consultants.Sum(c => c.HourlyRate * 16) },
                { "24h", configuration.Consultants.Sum(c => c.HourlyRate * 24) },
                { "40h", configuration.Consultants.Sum(c => c.HourlyRate * 40) },
                { "80h", configuration.Consultants.Sum(c => c.HourlyRate * 80) },
                { "120h", configuration.Consultants.Sum(c => c.HourlyRate * 120) },
                { "160h", configuration.Consultants.Sum(c => c.HourlyRate * 160) },
                { "200h", configuration.Consultants.Sum(c => c.HourlyRate * 200) },
                { "240h", configuration.Consultants.Sum(c => c.HourlyRate * 240) }
            };

            return Json(costs);
        }

        [HttpGet]
        public IEnumerable<CostConfiguration> GetAll()
        {
            return BuildTestSet();
        }

        public CostConfiguration? GetById(int id)
        {
            return _configurations.Find(c => c.Id == id);
        }

        private List<CostConfiguration> BuildTestSet()
        {
            var configs = new List<CostConfiguration>();
            var config1 = new CostConfiguration()
            {
                Id = 1,
                Consultants = new List<Consultant>(),
                Name = "A-team"
            };
            config1.Consultants.Add(new Consultant() { Name = "John Smith", HourlyRate = 1000 });
            config1.Consultants.Add(new Consultant() { Name = "Templeton Peck", HourlyRate = 1100 });
            config1.Consultants.Add(new Consultant() { Name = "H.M. Murdock", HourlyRate = 950 });
            config1.Consultants.Add(new Consultant() { Name = "Bosco Albert", HourlyRate = 1150 });

            var config2 = new CostConfiguration()
            {
                Id = 2,
                Consultants = new List<Consultant>(),
                Name = "Trailer Park Boys"
            };
            config2.Consultants.Add(new Consultant() { Name = "Ricky LaFleur", HourlyRate = 1100 });
            config2.Consultants.Add(new Consultant() { Name = "Julian", HourlyRate = 950 });
            config2.Consultants.Add(new Consultant() { Name = "Bubbles", HourlyRate = 950 });
            config2.Consultants.Add(new Consultant() { Name = "Jim Lahey", HourlyRate = 900 });
            config2.Consultants.Add(new Consultant() { Name = "Randy Bobandy", HourlyRate = 700 });

            var config3 = new CostConfiguration()
            {
                Id = 3,
                Consultants = new List<Consultant>(),
                Name = "Team Pickle Rick"
            };
            config3.Consultants.Add(new Consultant() { Name = "Rick Sanchez", HourlyRate = 1050 });
            config3.Consultants.Add(new Consultant() { Name = "Morty Smith", HourlyRate = 900 });
            config3.Consultants.Add(new Consultant() { Name = "Beth Smith", HourlyRate = 950 });
            config3.Consultants.Add(new Consultant() { Name = "Jerry Smith", HourlyRate = 900 });
            config3.Consultants.Add(new Consultant() { Name = "Summer Smith", HourlyRate = 600 });
            config3.Consultants.Add(new Consultant() { Name = "Mr Meeseeks", HourlyRate = 850 });
            config3.Consultants.Add(new Consultant() { Name = "Dr Xenon Bloom", HourlyRate = 900 });

            configs.Add(config1);
            configs.Add(config2);
            configs.Add(config3);

            return configs;
        }
    }
}
