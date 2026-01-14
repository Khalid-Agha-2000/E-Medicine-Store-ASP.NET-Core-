using System.Net;
using System.Text.Json;
using EMedicineBE.Models;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var response = context.Response;
        response.ContentType = "application/json";
        response.StatusCode = StatusCodes.Status500InternalServerError;

        var result = JsonSerializer.Serialize(new Response
        {
            StatusCode = response.StatusCode,
            StatusMessage = exception.Message
        });

        return response.WriteAsync(result);
    }
}