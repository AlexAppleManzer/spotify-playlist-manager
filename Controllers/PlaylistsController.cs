using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace senior_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistsController : ControllerBase
    {
        public readonly IHttpClientFactory httpClientFactory;
        public PlaylistsController(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }

        // GET: api/Playlists
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if(!User.Identity.IsAuthenticated)
            {
                return StatusCode(403);
            }
            var client = httpClientFactory.CreateClient("spotify");
            
            String spotifyToken = await HttpContext.GetTokenAsync("Spotify", "access_token");

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", spotifyToken);

            var result = await client.GetAsync("v1/me/playlists");

            if (!result.IsSuccessStatusCode)
            {
                return StatusCode(500, result);
            }
            return Ok(await result.Content.ReadAsStringAsync());
        }

        // GET: api/Playlists/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(new string[] { "value1", "value2" });
        }

        // POST: api/Playlists
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Playlists/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
