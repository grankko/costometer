using Xunit;
using Microsoft.AspNetCore.Mvc;
using CostOMeter.Web.Controllers;
using CostOMeter.Web.Models;
using System.Collections.Generic;

namespace CostOMeter.Web.Tests.Controllers
{
    public class ConfigsControllerTests
    {
        [Fact]
        public void Index_ReturnsViewResult()
        {
            // Arrange
            var controller = new ConfigsController();

            // Act
            var result = controller.Index();

            // Assert
            Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public void Create_ReturnsViewResult()
        {
            // Arrange
            var controller = new ConfigsController();

            // Act
            var result = controller.Create();

            // Assert
            Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public void BadIdShouldReturnNullTest()
        {
            var sut = new ConfigsController();
            var result = sut.GetById(-1);

            Assert.Null(result);
        }

        [Fact]
        public void GoodIdShouldReturnResultTest()
        {
            var id = 1;
            var sut = new ConfigsController();
            var result = sut.GetById(id);

            Assert.NotNull(result);
            Assert.Equal(id, result.Id);
            Assert.NotNull(result.Consultants);
            Assert.True(result.Consultants.Count > 0);
        }
    }
}
