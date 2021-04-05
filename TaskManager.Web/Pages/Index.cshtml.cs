using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TaskManager.Web.Models;
using TaskManager.Web.Services;

namespace TaskManager.Web.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IToDoService _toDoService;

        public IndexModel(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        public List<ToDo> ToDos { get; set; }

        public async Task OnGetAsync()
        {
            try
            {
                ToDos = (await _toDoService.GetAsync()).ToList();
            }
            catch (HttpRequestException)
            {
                ToDos = new List<ToDo>();
            }
        }
    }
}
