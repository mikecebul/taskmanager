﻿using System;
using TaskManager.Common.Contracts.ToDo;

namespace TaskManager.Data.Models
{
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
