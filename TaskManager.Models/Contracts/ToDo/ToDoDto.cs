using System;
using System.Text.Json.Serialization;

namespace TaskManager.Common.Contracts.ToDo
{
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
    }
}
