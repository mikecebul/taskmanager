using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TaskManager.Common.Contracts.ToDo;
using TaskManager.Web.Mapping;
using TaskManager.Web.Models;

namespace TaskManager.Web.Services
{
    public class ToDoService : IToDoService
    {
        public HttpClient Client { get; }

        public ToDoService(HttpClient client)
        {
            client.BaseAddress = new Uri("https://localhost:44318/");
            client.DefaultRequestHeaders.Add("Accept", "application/json");

            Client = client;
        }

        public async Task<IEnumerable<ToDo>> GetAsync()
        {
            var response = await Client.GetAsync("/api/ToDos");
            response.EnsureSuccessStatusCode();

            using var responseStream = await response.Content.ReadAsStreamAsync();
            var dtos = await JsonSerializer.DeserializeAsync<List<ToDoDto>>(responseStream);

            return dtos.Select(dto => ToDoMapper.DtoToWeb(dto));
        }

        public async Task<ToDo> GetAsync(int id)
        {
            var response = await Client.GetAsync($"/api/ToDos/{id}");

            try
            {
                response.EnsureSuccessStatusCode();

                using var responseStream = await response.Content.ReadAsStreamAsync();
                var dto = await JsonSerializer.DeserializeAsync<ToDoDto>(responseStream);

                return ToDoMapper.DtoToWeb(dto);
            }
            catch (HttpRequestException)
            {
                return null;
            }
        }

        public async Task<ToDo> PostAsync(ToDo toDo)
        {
            var toDoJson = new StringContent(JsonSerializer.Serialize(ToDoMapper.WebToDto(toDo), null), Encoding.UTF8, "application/json");
            var response = await Client.PostAsync("/api/Todos", toDoJson);
            response.EnsureSuccessStatusCode();

            using var responseStream = await response.Content.ReadAsStreamAsync();
            var dto = await JsonSerializer.DeserializeAsync<ToDoDto>(responseStream);

            return ToDoMapper.DtoToWeb(dto);
        }

        public async Task<bool> PutAsync(ToDo toDo)
        {
            var toDoJson = new StringContent(JsonSerializer.Serialize(ToDoMapper.WebToDto(toDo), null), Encoding.UTF8, "application/json");
            var response = await Client.PutAsync($"/api/Todos/{toDo.Id}", toDoJson);

            try
            {
                response.EnsureSuccessStatusCode();
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var response = await Client.DeleteAsync($"/api/Todos/{id}");

            try
            {
                response.EnsureSuccessStatusCode();
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
