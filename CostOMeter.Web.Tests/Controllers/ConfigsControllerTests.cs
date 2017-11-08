using Microsoft.VisualStudio.TestTools.UnitTesting;
using CostOMeter.Web.Controllers;

namespace CostOMeter.Web.Tests
{
    [TestClass]
    public class ConfigsControllerTests
    {
        [TestMethod]
        public void BadIdShouldReturnNullTest()
        {
            var sut = new ConfigsController();
            var result = sut.GetById(-1);

            Assert.IsNull(result);
        }

        [TestMethod]
        public void GoodIdShouldReturnResultTest()
        {
            var id = 1;
            var sut = new ConfigsController();
            var result = sut.GetById(id);

            Assert.IsNotNull(result);
            Assert.AreEqual(id, result.Id);
            Assert.IsNotNull(result.Consultants);
            Assert.IsTrue(result.Consultants.Count > 0);
        }
    }
}
