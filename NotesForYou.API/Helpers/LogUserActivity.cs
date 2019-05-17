using System;
using System.Security.Claims;
using System.Threading.Tasks;
using NotesForYou.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using NotesForYou.API.Models;

namespace NotesForYou.API.Helpers {
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultContext.HttpContext.RequestServices.GetService<IGenericRepository<User>>();

            var user =await repo.Get(userId);

            user.LastActive = DateTime.Now;

            await repo.SaveAll();
        }
    }
}