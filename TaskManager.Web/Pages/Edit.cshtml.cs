using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using TaskManager.Web.Models;
using TaskManager.Web.Services;

namespace TaskManager.Web.Pages
{
    public class EditModel : PageModel
    {
        private readonly IToDoService _toDoService;

        public EditModel(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        [BindProperty]
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

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var isSuccess = await _toDoService.PutAsync(ToDo);

            return isSuccess ? RedirectToPage("./Index") : RedirectToPage("./Error");
        }
    }
}
