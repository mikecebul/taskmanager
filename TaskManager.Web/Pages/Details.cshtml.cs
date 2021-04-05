using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using TaskManager.Web.Models;
using TaskManager.Web.Services;

namespace TaskManager.Web.Pages
{
    public class DetailsModel : PageModel
    {
        private readonly IToDoService _toDoService;

        public DetailsModel(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        public ToDo ToDo { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ToDo = await _toDoService.GetAsync(id.Value);

            if (ToDo == null)
            {
                return NotFound();
            }

            return Page();
        }
    }
}
