using System;
using System.Text.Json.Serialization;

namespace TaskManager.Common.Contracts.ToDo
{
  public enum Status
  {
    ToDo,
    InProgress,
    Done
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

        [JsonPropertyName("status")]
        public Status Status { get; set; }
  }
  public class ToDoUpdateDto
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("duedate")]
        public DateTime? DueDate { get; set; }

        [JsonPropertyName("notes")]
        public string Notes { get; set; }

        [JsonPropertyName("status")]
        public Status? Status { get; set; }
    }
}
