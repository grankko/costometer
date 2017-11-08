using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Costometer.Models;

namespace Web.Costometer.Controllers
{

    [Route("api/[controller]")]
    public class ConfigsController : Controller
    {

        [HttpGet]
        public IEnumerable<CostConfiguration> GetAll()
        {
            return BuildTestSet();
        }

        [HttpGet("{id}")]
        public CostConfiguration GetById(long id)
        {
            return BuildTestSet().First(cc => cc.Id == id);
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
            config1.Consultants.Add(new Consultant() { Name = "John Smith", HourlyCost = 1000 });
            config1.Consultants.Add(new Consultant() { Name = "Templeton Peck", HourlyCost = 1100 });
            config1.Consultants.Add(new Consultant() { Name = "H.M. Murdock", HourlyCost = 950 });
            config1.Consultants.Add(new Consultant() { Name = "Bosco Albert", HourlyCost = 1150 });

            var config2 = new CostConfiguration()
            {
                Id = 2,
                Consultants = new List<Consultant>(),
                Name = "Trailer Park Boys"
            };
            config2.Consultants.Add(new Consultant() { Name = "Ricky LaFleur", HourlyCost = 1100 });
            config2.Consultants.Add(new Consultant() { Name = "Julian", HourlyCost = 950 });
            config2.Consultants.Add(new Consultant() { Name = "Bubbles", HourlyCost = 950 });
            config2.Consultants.Add(new Consultant() { Name = "Jim Lahey", HourlyCost = 900 });
            config2.Consultants.Add(new Consultant() { Name = "Randy Bobandy", HourlyCost = 700 });

            var config3 = new CostConfiguration()
            {
                Id = 3,
                Consultants = new List<Consultant>(),
                Name = "Team Pickle Rick"
            };
            config3.Consultants.Add(new Consultant() { Name = "Rick Sanchez", HourlyCost = 1050 });
            config3.Consultants.Add(new Consultant() { Name = "Morty Smith", HourlyCost = 900 });
            config3.Consultants.Add(new Consultant() { Name = "Beth Smith", HourlyCost = 950 });
            config3.Consultants.Add(new Consultant() { Name = "Jerry Smith", HourlyCost = 900 });
            config3.Consultants.Add(new Consultant() { Name = "Summer Smith", HourlyCost = 600 });
            config3.Consultants.Add(new Consultant() { Name = "Mr Meeseeks", HourlyCost = 850 });
            config3.Consultants.Add(new Consultant() { Name = "Dr Xenon Bloom", HourlyCost = 900 });

            configs.Add(config1);
            configs.Add(config2);
            configs.Add(config3);

            return configs;
        }
    }
}
