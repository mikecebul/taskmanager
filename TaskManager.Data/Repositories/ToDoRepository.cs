using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Common.Contracts.ToDo;
using TaskManager.Data.Framework;
using TaskManager.Data.Models;

namespace TaskManager.Data.Repositories
{
    public class ToDoRepository : IToDoRepository
    {
        private readonly AppDbContext _context;

        public ToDoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ToDo>> GetAsync()
        {
            return await _context.ToDo.ToListAsync();
        }

        public async Task<ToDo> GetAsync(int id)
        {
            return await Task.FromResult(_context.ToDo.AsNoTracking().FirstOrDefault(x => x.Id == id));
        }

        public async Task<ToDo> PatchAsync(int id, ToDoUpdateDto dto)
        {
          // 1. Retrieve the existing ToDo item from the database
          var toDo = await _context.ToDo.FindAsync(id);

          // 2. Check if the ToDo item exists
          if (toDo == null)
          {
            // Return null if not found
            return null;
          }

          // 3. Update the ToDo item fields if the DTO has a non-null value
          if (dto.Title != null)
          {
            toDo.Title = dto.Title;
          }

          if (dto.Description != null)
          {
            toDo.Description = dto.Description;
          }

          if (dto.DueDate.HasValue)
          {
            toDo.DueDate = dto.DueDate.Value;
          }

          if (dto.Notes != null)
          {
            toDo.Notes = dto.Notes;
          }

          if (dto.Status.HasValue)
          {
            toDo.Status = dto.Status.Value;
          }

          // 4. Save the changes
          await _context.SaveChangesAsync();

          // 5. Return the updated ToDo item
          return toDo;
        }

        public async Task<ToDo> PutAsync(ToDo toDo)
        {
            _context.Entry(toDo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoExists(toDo.Id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return toDo;
        }

        public async Task<ToDo> PostAsync(ToDo toDo)
        {
            _context.ToDo.Add(toDo);
            await _context.SaveChangesAsync();

            return toDo;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var toDo = await _context.ToDo.FindAsync(id);
            if (toDo == null)
            {
                return false;
            }

            _context.ToDo.Remove(toDo);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool ToDoExists(int id)
        {
            return _context.ToDo.Any(e => e.Id == id);
        }
    }
}
