using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Common.Contracts.ToDo;
using TaskManager.Data.Repositories;
using TaskManager.Services.Mapping;

namespace TaskManager.Services.Services
{
    public class ToDoService : IToDoService
    {
        private readonly IToDoRepository _toDoRepository;

        public ToDoService(IToDoRepository toDoRepository)
        {
            _toDoRepository = toDoRepository;
        }

        public async Task<IEnumerable<ToDoDto>> GetAsync()
        {
            var toDos = await _toDoRepository.GetAsync();

            return toDos.Select(ToDoMapper.DomainToDto).ToList();
        }

        public async Task<ToDoDto> GetAsync(int id)
        {
            var toDo = await _toDoRepository.GetAsync(id);

            return ToDoMapper.DomainToDto(toDo);
        }

        public async Task<ToDoDto> PutAsync(ToDoDto dto)
        {
            var toDo = await _toDoRepository.PutAsync(ToDoMapper.DtoToDomain(dto));

            return ToDoMapper.DomainToDto(toDo);
        }

        public async Task<ToDoDto> PostAsync(ToDoDto dto)
        {
            var toDo = await _toDoRepository.PostAsync(ToDoMapper.DtoToDomain(dto));

            return ToDoMapper.DomainToDto(toDo);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var isSuccess = await _toDoRepository.DeleteAsync(id);

            return isSuccess;
        }
    }
}
