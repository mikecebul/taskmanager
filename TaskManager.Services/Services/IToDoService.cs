using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Common.Contracts.ToDo;

namespace TaskManager.Services.Services
{
    public interface IToDoService
    {
        Task<IEnumerable<ToDoDto>> GetAsync();
        Task<ToDoDto> GetAsync(int id);
        Task<ToDoDto> PatchAsync(int id, ToDoUpdateDto dto);
        Task<ToDoDto> PutAsync(ToDoDto dto);
        Task<ToDoDto> PostAsync(ToDoDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
