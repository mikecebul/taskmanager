using TaskManager.Common.Contracts.ToDo;
using TaskManager.Data.Models;

namespace TaskManager.Services.Mapping
{
    public class ToDoMapper
    {
        public static ToDoDto DomainToDto(ToDo domain) => domain != null
            ? new ToDoDto {
                Id = domain.Id,
                Title = domain.Title,
                Description = domain.Description,
                DueDate = domain.DueDate,
                Notes = domain.Notes
            }
            : null;

        public static ToDo DtoToDomain(ToDoDto dto) => new ToDo {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            Notes = dto.Notes
        };
    }
}