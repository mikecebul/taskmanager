using Moq;
using NUnit.Framework;
using TaskManager.Data.Models;
using TaskManager.Data.Repositories;
using SpecsFor.Core;
using TaskManager.Services.Services;
using System.Threading.Tasks;
using System;
using SpecsFor.StructureMap;
using TaskManager.Common.Contracts.ToDo;

namespace TaskManager.Tests
{
    [TestFixture]
    public class GetByIdAsync_Item_Exists : SpecsFor<ToDoService>
    {
        private readonly ToDoService _sut;
        private readonly Mock<IToDoRepository> _todoRepo = new Mock<IToDoRepository>();
        private int _todoId = 0;
        private ToDoDto _todoItem;

        public GetByIdAsync_Item_Exists()
        {
            _sut = new ToDoService(_todoRepo.Object);
        }

        protected override void Given()
        {
            base.Given();
            var rng = new Random();
            _todoId = rng.Next(1, 100);

            var todo = new ToDo
            {
                Id = _todoId,
                DueDate = DateTime.MaxValue,
                Description = Guid.NewGuid().ToString(),
                Notes = Guid.NewGuid().ToString(),
                Title = Guid.NewGuid().ToString()
            };

            _todoRepo.Setup(x => x.GetAsync(_todoId)).Returns(Task.FromResult(todo));
        }

        protected override void When()
        {
            base.When();
            _todoItem = _sut.GetAsync(_todoId).Result;
        }

        [Test]
        public void Then_The_Todo_Repo_Is_Called_Once()
        {
            _todoRepo.Verify(x => x.GetAsync(_todoId), Times.Once);
            _todoRepo.VerifyNoOtherCalls();
        }

        [Test]
        public void Then_An_Object_With_A_Matching_Id_Is_Returned()
        {
            Assert.NotNull(_todoItem);
            Assert.AreEqual(_todoId, _todoItem.Id);
        }
    }
}