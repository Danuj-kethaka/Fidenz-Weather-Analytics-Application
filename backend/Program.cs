using backend.Services;
using Auth0.AspNetCore.Authentication.Api;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddMemoryCache();

builder.Services.AddScoped<IweatherService, WeatherService>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped<IcomfortIndexService, ComfortIndexService>();

// CORS - Allow React frontend during local development
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Auth0 authentication
builder.Services.AddAuth0ApiAuthentication(
    builder.Configuration.GetSection("Auth0")
);

builder.Services.AddAuthorization();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve React frontend files from wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

// CORS
app.UseCors("ReactApp");

// Auth0 authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// API controllers
app.MapControllers();

// React SPA fallback
app.MapFallbackToFile("index.html");

app.Run();