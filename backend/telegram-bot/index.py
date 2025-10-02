import json
import os
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram бот для консультаций по антикоррупционным стандартам
    Args: event - webhook от Telegram, context - объект с request_id
    Returns: HTTP ответ с подтверждением обработки
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Bot token not configured'})
        }
    
    if method != 'POST':
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    update = json.loads(event.get('body', '{}'))
    
    if 'message' not in update:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    message = update['message']
    chat_id = message['chat']['id']
    text = message.get('text', '')
    
    response_text = get_response(text)
    
    send_message(bot_token, chat_id, response_text)
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'ok': True})
    }


def get_response(text: str) -> str:
    '''Определяет ответ на основе текста сообщения'''
    text_lower = text.lower().strip()
    
    if text_lower in ['/start', 'start', 'начать']:
        return '''👋 Здравствуйте! Я бот-консультант по антикоррупционным стандартам.

Я помогу вам найти ответы на вопросы:
🎁 Подарки и вознаграждения
⚖️ Конфликт интересов  
📋 Закупки и тендеры
🚫 Запреты для госслужащих
⚠️ Ограничения для госслужащих
📢 Сообщение о нарушениях

Просто напишите ваш вопрос или используйте команды:
/help - Помощь
/gifts - Подарки
/conflict - Конфликт интересов
/procurement - Закупки
/report - Сообщить о нарушении'''
    
    if text_lower in ['/help', 'help', 'помощь']:
        return '''❓ Доступные команды:

/start - Начать работу
/gifts - Вопросы о подарках
/conflict - Конфликт интересов
/procurement - Закупки и тендеры
/prohibitions - Запреты для госслужащих
/violations - Примеры нарушений
/report - Как сообщить о нарушении

Или просто напишите свой вопрос!'''
    
    if text_lower in ['/gifts', 'подарки', 'подарок']:
        return '''🎁 Подарки и вознаграждения:

❓ Можно ли принимать подарки?
Сотрудники могут принимать подарки стоимостью не более 3000 рублей в год от одного источника. Подарки дороже 3000 рублей должны передаваться в собственность организации.

❓ Что делать с дорогим подарком?
Если стоимость подарка превышает 3000 рублей, необходимо немедленно сообщить об этом руководителю и передать подарок в отдел кадров для оценки и принятия решения.

Есть еще вопросы? Напишите!'''
    
    if text_lower in ['/conflict', 'конфликт', 'конфликт интересов']:
        return '''⚖️ Конфликт интересов:

❓ Что такое конфликт интересов?
Конфликт интересов — это ситуация, при которой личная заинтересованность сотрудника может повлиять на объективное исполнение им должностных обязанностей.

❓ Как действовать при конфликте интересов?
Необходимо немедленно уведомить непосредственного руководителя в письменной форме. Далее принимается решение об устранении конфликта: отвод от принятия решений, перевод на другую должность и т.д.

Есть еще вопросы? Напишите!'''
    
    if text_lower in ['/procurement', 'закупки', 'тендер', 'тендеры']:
        return '''📋 Закупки и тендеры:

❓ Правила участия в тендерах
Все тендеры должны проводиться открыто и прозрачно. Запрещается предоставлять преференции отдельным участникам.

❓ Работа с родственниками поставщиков
Если у вас есть родственные связи с представителями поставщика, это необходимо раскрыть до начала процедуры закупки.

Есть еще вопросы? Напишите!'''
    
    if text_lower in ['/prohibitions', 'запреты', 'запрет']:
        return '''🚫 Запреты для госслужащих:

Государственным и муниципальным служащим ЗАПРЕЩАЕТСЯ:
• Участвовать на платной основе в управлении коммерческой организацией
• Осуществлять предпринимательскую деятельность
• Приобретать ценные бумаги, по которым может быть получен доход
• Получать вознаграждения от физических и юридических лиц
• Выезжать в командировки за счет других лиц (кроме служебных)

Есть еще вопросы? Напишите!'''
    
    if text_lower in ['/violations', 'нарушения', 'примеры']:
        return '''⚠️ Примеры нарушений:

📌 Принятие дорогого подарка
Госслужащий принял подарок 50 000₽
Последствия: увольнение, административная/уголовная ответственность

📌 Скрытие конфликта интересов  
Чиновник не сообщил, что его супруга владеет компанией-участником тендера
Последствия: дисциплинарное взыскание, увольнение

📌 Использование служебного положения
Чиновник использовал должность для получения преимуществ родственнику
Последствия: увольнение, уголовная ответственность (ст. 285 УК РФ)

Есть еще вопросы? Напишите!'''
    
    if text_lower in ['/report', 'сообщить', 'нарушение', 'жалоба']:
        return '''📢 Сообщение о нарушениях:

📞 Горячая линия: 8-800-xxx-xx-xx
📧 Email: compliance@company.com
🌐 Форма на сайте: [ссылка]

✅ Гарантии:
• Полная анонимность
• Защита от преследования
• Конфиденциальность информации

Компания защищает сотрудников, добросовестно сообщивших о нарушениях!'''
    
    keywords_gifts = ['подарок', 'подар', 'вознаграждение', 'премия', 'бонус']
    keywords_conflict = ['конфликт', 'интерес', 'заинтересован', 'родственник']
    keywords_procurement = ['закупк', 'тендер', 'поставщик', 'контракт']
    keywords_report = ['сообщить', 'жалоба', 'нарушение', 'горячая линия']
    
    if any(kw in text_lower for kw in keywords_gifts):
        return 'Вопрос о подарках? Используйте /gifts для подробной информации или уточните ваш вопрос.'
    
    if any(kw in text_lower for kw in keywords_conflict):
        return 'Вопрос о конфликте интересов? Используйте /conflict для подробной информации или уточните ваш вопрос.'
    
    if any(kw in text_lower for kw in keywords_procurement):
        return 'Вопрос о закупках? Используйте /procurement для подробной информации или уточните ваш вопрос.'
    
    if any(kw in text_lower for kw in keywords_report):
        return 'Хотите сообщить о нарушении? Используйте /report для получения контактов или уточните ваш вопрос.'
    
    return '''Я не совсем понял ваш вопрос. 

Используйте команды:
/help - Список всех команд
/gifts - Подарки
/conflict - Конфликт интересов
/procurement - Закупки
/report - Сообщить о нарушении

Или попробуйте переформулировать вопрос.'''


def send_message(bot_token: str, chat_id: int, text: str) -> None:
    '''Отправляет сообщение через Telegram API'''
    import urllib.request
    import urllib.parse
    
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode()
    
    req = urllib.request.Request(url, data=data)
    urllib.request.urlopen(req)
