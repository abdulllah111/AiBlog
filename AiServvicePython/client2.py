import pika
import gpt
import threading
from Protos.assistantai_pb2 import PromtRequest

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='aisite_request_queue')
channel.queue_declare(queue='aisite_response_queue')




def generate_titles(message):
    context_for_titles = [] 
    context_for_titles.append({"role": "system", "content": "Ты являешься копирайтером блога."})
    context_for_titles.append({"role": "user", "content": "Твоя цель составить 5 заголовков для статей блога. Ключевые слова: спорт, похудение, правильное питание, набор мышечной массы. Предоставь ответ конкретно в виде: заголовок1;заголовок2;заголовокn. Ни в коем случае не делай перечисление заголовков в формате 1. 2. ... Ни в коем случае не оборачивай заголовки в кавычки."})
    context_for_titles.append({"role": "assistant", "content": "5 эффективных упражнений для спорта и похудения;Как правильное питание помогает достичь идеальной формы;Секреты набора мышечной массы при занятиях спортом;Пять правил правильного питания для успешного похудения;Как спорт и правильное питание влияют на физическую форму и самочувствие"})
    context_for_titles.append({"role": "user", "content": "Твоя цель составить 5 заголовков для статей блога. Ключевые слова: мода, стильная одежда, стиль. Предоставить ответ конкретно в виде: заголовок1;заголовок2;заголовокn"})
    context_for_titles.append({"role": "assistant", "content": "Топ-10 модных трендов этого сезона;Как создать стильный образ с минимальными затратами;Секреты стильной одежды для каждого типа фигуры;5 основных правил стильного образа;Как создать свой уникальный стиль"})
    context_for_titles.append({"role": "user", "content": "Мотивация, успех, стремление"})
    context_for_titles.append({"role": "assistant", "content": "Как найти мотивацию для достижения успеха;Как его достичь и сохранить;Как стремление к достижению целей влияет на нашу жизнь;Кекреты постоянного движения вперед;Как преодолеть трудности и достичь успеха"})
    context_for_titles.append({"role": "user", "content": "Твоя цель составить 2 заголовков для статей блога. Ключевые слова: спорт, похудение"})
    context_for_titles.append({"role": "assistant", "content": "Максимальный эффект от занятий спортом для похудения: реальность или миф?; Как правильное питание и регулярные спортивные тренировки помогут вам похудеть эффективно"})


    
    context_for_titles.append({"role": "user", "content": message})  
    titles = gpt.Generate(context_for_titles)
    if ";" in titles:
        titles.replace('"', "")
        titles = titles.split(";")
    else:
        return "NoN"
    return titles




def generate_text(title):
    _context_for_text = []
    _context_for_text.append({"role": "system", "content": "Ты являешься копирайтером блога."})
    _context_for_text.append({"role": "user", "content": "Напиши короткую статью размером в 1000 знаков на тему: 5 эффективных упражнений для спорта и похудения"})
    _context_for_text.append({"role": "assistant", "content": "Спорт и физические упражнения - это важная часть здорового образа жизни. Они помогают укрепить мышцы, улучшить кровообращение и снизить вес. Вот 5 эффективных упражнений для спорта и похудения: \n 1. Приседания: Это упражнение помогает укрепить мышцы ног и ягодиц, а также сжечь калории. Стоит начать с 10-15 повторений в 2-3 подходах. \n 2.Отжимания: Они укрепляют мышцы груди, плеч и рук, а также помогают сжечь калории. Начните с 10-15 повторений в 2-3 подходах.\n 3. Планка: Это упражнение укрепляет мышцы кора, спины и рук, а также помогает сжечь калории. Начните с удержания позы на 30 секунд в 2-3 подходах.\n 4. Бег: Это упражнение помогает улучшить кровообращение, сжечь калории и укрепить мышцы ног. Начните с бега на 10-15 минут в день и постепенно увеличивайте время.\n 5. Скакалка: Это упражнение помогает укрепить мышцы ног и рук, а также сжечь калории. Начните с 1-2 минут в день и постепенно увеличивайте время.\nВажно помнить, что перед началом любой физической активности необходимо проконсультироваться с врачом."})
    _context_for_text.append({"role": "user", "content": "Напиши короткую статью размером в 1000 знаков на тему: Секреты постоянного совершенствования"})
    _context_for_text.append({"role": "assistant", "content": "В постоянно меняющемся мире совершенствование становится неотъемлемой частью нашей жизни. Каждый из нас стремится стать лучше в различных аспектах своей жизни, будь то карьера, отношения, здоровье или саморазвитие. Но как достичь постоянного совершенствования? В этой статье мы рассмотрим несколько секретов, которые помогут вам на этом пути.\n 1. Установите ясные цели: Чтобы постоянно совершенствоваться, важно иметь ясное представление о том, чего вы хотите достичь. Определите свои цели и разбейте их на более мелкие шаги, чтобы упростить процесс достижения.\n 2. Обучайтесь постоянно: Образование и самообразование являются ключевыми факторами постоянного совершенствования. Читайте книги, посещайте семинары и тренинги, изучайте новые технологии и навыки. Будьте открытыми к новым знаниям и опыту.\n 3. Ведите дневник: Ведение дневника помогает отслеживать ваш прогресс и развивать рефлексию. Записывайте свои цели, достижения и уроки, которые вы извлекли из своих ошибок. Это поможет вам оценить свой прогресс и найти области, в которых вы можете улучшиться.\n 4. Преодолевайте свои страхи: Часто страхи и неуверенность мешают нам двигаться вперед и совершенствоваться. Идите в ногу со своими страхами и выходите за пределы своей зоны комфорта. Это поможет вам расширить свои границы и достичь новых высот.\n 5. Взаимодействуйте с успешными людьми: Окружитесь людьми, которые вдохновляют вас и мотивируют на постоянное совершенствование. Общение с успешными людьми позволит вам узнать их подходы к жизни, а также заимствовать полезные навыки и стратегии.\n 6. Практикуйте регулярно: Постоянное совершенствование требует постоянной практики. Независимо от того, над какими навыками или навыками вы работаете, вы должны посвящать время и усилия на их развитие. Постепенно, с регулярной практикой, вы достигнете лучших результатов.\n 7. Будьте гибкими и открытыми к изменениям: Мир постоянно меняется, и чтобы оставаться впереди, важно быть гибкими и открытыми к изменениям. Принимайте новые идеи, адаптируйтесь к новым ситуациям и готовы менять свои подходы, когда это необходимо.\n В конечном счете, постоянное совершенствование - это процесс, который требует времени, усилий и постоянного стремления к самосовершенствованию. Следуя вышеупомянутым секретам, вы можете достичь личного роста и стать лучшей версией себя. Никогда не останавливайтесь на достигнутом и всегда идите вперед, улучшая себя и свою жизнь."})
    _context_for_text.append({"role": "user", "content": "Напиши короткую статью размером в 1000 знаков на тему: " + title})


    

    return {"title": title, "text": gpt.Generate(_context_for_text)}


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body.decode("utf-8"))
    
    message = PromtRequest()
    message.ParseFromString(body)
    
    titles = generate_titles(message.message)
    if(titles != "NoN"):
        lock = threading.Lock()

        def process_title(title):
            result = generate_text(title)
            with lock:
                ch.basic_publish(exchange='',
                            routing_key='aisite_response_queue',
                            properties=pika.BasicProperties(
                                correlation_id=properties.correlation_id),
                            body=str(result))

        
        # Создаем и запускаем потоки для обработки каждого заголовка
        threads = []
        for title in titles:
            thread = threading.Thread(target=process_title, args=(title,))
            threads.append(thread)
            thread.start()

        # Ждем завершения всех потоков
        for thread in threads:
            thread.join()
    else:
        ch.basic_publish(exchange='',
                         routing_key='aisite_response_queue',
                         properties=pika.BasicProperties(
                             correlation_id=properties.correlation_id),
                         body="NoN")

    ch.basic_publish(exchange='',
                         routing_key='aisite_response_queue',
                         properties=pika.BasicProperties(
                             correlation_id=properties.correlation_id),
                         body="last_response")
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(queue='aisite_request_queue',
                      on_message_callback=callback)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()


