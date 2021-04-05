using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskManager.Common.Contracts.ToDo;
using TaskManager.Services.Services;

namespace TaskManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDosController : ControllerBase
    {
        private readonly IToDoService _toDoService;

        public ToDosController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        // GET: api/ToDos
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var toDos = await _toDoService.GetAsync();

            return Ok(toDos);
        }

        // GET: api/ToDos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var toDo = await _toDoService.GetAsync(id);

            return toDo != null ? (IActionResult) Ok(toDo) : NotFound();
        }

        // PUT: api/ToDos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ToDoDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            var toDoExists = (await _toDoService.GetAsync(id)) != null;

            if (toDoExists)
            {
                var toDo = await _toDoService.PutAsync(dto);

                return toDo != null ? (IActionResult) NoContent() : NotFound();
            }
            else
            {
                var toDo = await _toDoService.PostAsync(dto);

                return CreatedAtAction(nameof(GetById), new { id = toDo.Id }, toDo);
            }
        }

        // POST: api/ToDos
        [HttpPost]
        public async Task<IActionResult> Post(ToDoDto dto)
        {
            var toDo = await _toDoService.PostAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = toDo.Id }, toDo);
        }

        // DELETE: api/ToDos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var isSuccess = await _toDoService.DeleteAsync(id);

            return isSuccess ? (IActionResult) NoContent() : NotFound();
        }

        private async Task<ToDoDto> CreateToDo(ToDoDto dto)
        {
            return await _toDoService.PostAsync(dto);
        }
    }
}
