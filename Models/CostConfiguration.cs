using System.Collections.Generic;

namespace Web.Costometer.Models
{
    public class CostConfiguration
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<Consultant> Consultants { get; set; }

    }
}
