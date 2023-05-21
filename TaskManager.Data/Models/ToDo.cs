using System;

namespace TaskManager.Data.Models
{
  public enum Status
  {
    none,
    started,
    done
  }
    public class ToDo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Notes { get; set; }
        public Status Status { get; set; }
    }
}
