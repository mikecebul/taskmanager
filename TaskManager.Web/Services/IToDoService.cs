using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Web.Models;

namespace TaskManager.Web.Services
{
    public interface IToDoService
    {
        Task<IEnumerable<ToDo>> GetAsync();
        Task<ToDo> GetAsync(int id);
        Task<ToDo> PostAsync(ToDo toDo);
        Task<bool> PutAsync(ToDo toDo);
        Task<bool> DeleteAsync(int id);
    }
}
