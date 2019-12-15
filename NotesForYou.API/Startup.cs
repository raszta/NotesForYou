using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NotesForYou.API.Data;
using NotesForYou.API.Helpers;
using NotesForYou.API.Models;

namespace NotesForYou {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddDbContext<DataContext> (x => x.UseSqlite (Configuration.GetConnectionString ("DefaultConnection")));

            IdentityBuilder builder = services.AddIdentityCore<User> (opt => {
                opt.Password.RequireDigit = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequiredLength = 4;
                opt.Password.RequireNonAlphanumeric = false;
            });

            builder = new IdentityBuilder (builder.UserType, typeof (Role), builder.Services);
            builder.AddEntityFrameworkStores<DataContext> ();
            builder.AddRoleValidator<RoleValidator<Role>> ();
            builder.AddRoleManager<RoleManager<Role>> ();
            builder.AddSignInManager<SignInManager<User>> ();

            services.AddAuthorization (options => {
                options.AddPolicy ("RequireAdminRole", policy => policy.RequireRole ("admin"));
                options.AddPolicy ("ModeratePhotoRole", policy => policy.RequireRole ("admin", "moderator"));
                options.AddPolicy ("VipOnly", policy => policy.RequireRole ("VIP"));
            });

            services.AddMvc (opt => {
                    var policy = new AuthorizationPolicyBuilder ()
                        .RequireAuthenticatedUser ()
                        .Build ();
                    opt.Filters.Add (new AuthorizeFilter (policy));
                })
                .SetCompatibilityVersion (CompatibilityVersion.Version_2_2)
                .AddJsonOptions (opt => {
                    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddScoped<IAuthRepository, AuthRepository> ();
            services.AddScoped<INoteRepository, NoteRepository> ();
            services.AddScoped (typeof (IGenericRepository<>), typeof (GenericRepository<>));
            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer (options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey (Encoding.ASCII.GetBytes (
                    Configuration.GetSection ("AppSettings:Token").Value)),
                    ValidateAudience = false,
                    ValidateIssuer = false
                    };
                });
            services.AddCors ();
            services.AddAutoMapper ();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler (builder => {
                    builder.Run (async context => {
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature> ();
                        if (error != null) {
                            context.Response.AddapplicationError (error.Error.Message);
                            await context.Response.WriteAsync (error.Error.Message);
                        }
                    });
                });
                // app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors (x => x.AllowAnyHeader ().AllowAnyMethod ().AllowAnyOrigin ());
            app.UseAuthentication ();
            app.UseMvc ();
        }
    }
}