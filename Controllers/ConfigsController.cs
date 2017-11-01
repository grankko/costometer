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

        private List<CostConfiguration> BuildTestSet() {
                        var configs = new List<CostConfiguration>();
            var config1 = new CostConfiguration() {
                Id = 1,
                Consultants = new List<Consultant>(),
                Name="Test configuration 1"
            };
            config1.Consultants.Add(new Consultant() { Name = "Developer 1", HourlyCost = 1000});
            config1.Consultants.Add(new Consultant() { Name = "Developer 2", HourlyCost = 1100});
            config1.Consultants.Add(new Consultant() { Name = "Tester 1", HourlyCost = 950});
            config1.Consultants.Add(new Consultant() { Name = "Tester 2", HourlyCost = 1150});

            var config2 = new CostConfiguration() {
                Id = 2,
                Consultants = new List<Consultant>(),
                Name="Test configuration 2"
            };
            config2.Consultants.Add(new Consultant() { Name = "Developer 1", HourlyCost = 1100});
            config2.Consultants.Add(new Consultant() { Name = "Tester 1", HourlyCost = 950});
            
            configs.Add(config1);
            configs.Add(config2);

            return configs;
        }
    }
}
