using System.Collections.Generic;

namespace CostOMeter.Web.Models
{
    public class CostConfiguration
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<Consultant> Consultants { get; set; }

    }
}
