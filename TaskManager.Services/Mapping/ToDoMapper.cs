using System;
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
                Notes = domain.Notes,
                Status = domain.Status,
            }
            : null;

        public static ToDo DtoToDomain(ToDoDto dto) => new ToDo {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            Notes = dto.Notes,
            Status = dto.Status,
        };
        public static ToDo DtoToDomain(ToDoUpdateDto dto)
        {
          return new ToDo
          {
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate ?? default(DateTime),
            Notes = dto.Notes,
            Status = dto.Status ?? default(Status)
          };
        }
  }
}