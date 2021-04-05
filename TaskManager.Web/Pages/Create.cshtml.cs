using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using TaskManager.Web.Models;
using TaskManager.Web.Services;

namespace TaskManager.Web.Pages
{
    public class CreateModel : PageModel
    {
        private readonly IToDoService _toDoService;

        public CreateModel(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public ToDo ToDo { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            ToDo = await _toDoService.PostAsync(ToDo);

            return RedirectToPage($"./Edit", new { id = ToDo.Id });
        }
    }
}
