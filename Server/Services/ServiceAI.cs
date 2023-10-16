using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Server.Rabbitmq;

namespace Server.Services;

public class ServiceAI : TelegramClientService.TelegramClientServiceBase
{
    private readonly ILogger<ServiceAI> _logger;
    private readonly RabbitMQClient rabbitMQClient;

    public ServiceAI(ILogger<ServiceAI> logger, RabbitMQClient rabbitMQClient)
    {
        _logger = logger;
        this.rabbitMQClient = rabbitMQClient;
    }

    public override async Task<PromtResponse> SendMessage(PromtRequest request, ServerCallContext context)
    {

        var response = await rabbitMQClient.SendMessageAsync(request);
        var res = "[";

        if(response[0] != "NoN"){
            foreach (var item in response)
            {
                res += $"{item},";
            }
            return new PromtResponse { Response = $"{res}]"};
        }
        return new PromtResponse { Response = response[0] };
        
    }
}
