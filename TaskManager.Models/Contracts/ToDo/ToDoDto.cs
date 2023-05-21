using System;
using System.Text.Json.Serialization;

namespace TaskManager.Common.Contracts.ToDo
{
  public enum Status
  {
    none,
    started,
    done
  }
  public class ToDoDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("duedate")]
        public DateTime DueDate { get; set; }

        [JsonPropertyName("notes")]
        public string Notes { get; set; }

        [JsonPropertyName("started")]
        public bool Started { get; set; }

        [JsonPropertyName("completed")]
        public bool Completed { get; set; }
  }
}
