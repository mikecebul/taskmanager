using TaskManager.Common.Contracts.ToDo;
using TaskManager.Web.Models;

namespace TaskManager.Web.Mapping
{
    public class ToDoMapper
    {
        public static ToDoDto WebToDto(ToDo web) => web != null
            ? new ToDoDto {
                Id = web.Id,
                Title = web.Title,
                Description = web.Description,
                DueDate = web.DueDate,
                Notes = web.Notes
            }
            : null;

        public static ToDo DtoToWeb(ToDoDto dto) => new ToDo {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            Notes = dto.Notes
        };
    }
}