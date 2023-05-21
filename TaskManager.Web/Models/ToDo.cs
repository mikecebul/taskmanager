using System;
using TaskManager.Common.Contracts.ToDo;

namespace TaskManager.Web.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Notes { get; set; }
        public bool Started { get; set;}
        public bool Completed { get; set; }
  }
}
