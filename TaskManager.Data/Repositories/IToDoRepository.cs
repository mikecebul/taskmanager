using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Common.Contracts.ToDo;
using TaskManager.Data.Models;

namespace TaskManager.Data.Repositories
{
    public interface IToDoRepository
    {
        Task<IEnumerable<ToDo>> GetAsync();
        Task<ToDo> GetAsync(int id);
        Task<ToDo> PatchAsync(int id, ToDoUpdateDto dto);
        Task<ToDo> PutAsync(ToDo dto);
        Task<ToDo> PostAsync(ToDo dto);
        Task<bool> DeleteAsync(int id);
  }
}
