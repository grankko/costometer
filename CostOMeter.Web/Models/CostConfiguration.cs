using System.Collections.Generic;

namespace CostOMeter.Web.Models
{
    public class CostConfiguration
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required List<Consultant> Consultants { get; set; }
    }
}
