using Microsoft.EntityFrameworkCore;
using ProFatura.DAL;
using ProFatura.DAL.Repositories;
using Shared;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ProFaturaDbContext>(x =>
    x.UseMySql(
        builder.Configuration.GetConnectionString("ProFaturaBDConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("ProFaturaBDConnection"))
    )
);

// Adicionar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddScoped<IUtilizadoresRepository, UtilizadoresRepository>();
builder.Services.AddScoped<IProdutosRepository, ProdutosRepository>();
builder.Services.AddScoped<IFacturasRepository, FacturasRepository>();
builder.Services.AddScoped<IFacturasProdutosRepository , FacturasProdutosRepository>();
builder.Services.AddScoped<IClientesRepository, ClientesRepository>();
builder.Services.AddScoped<IFaturaDetalhadaRepository, FaturaDetalhadaRepository>();


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => //
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Criar DB e tabelas se não existirem
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ProFaturaDbContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseCors(); //

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
