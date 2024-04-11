from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta,timezone
import logging
import pytz

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/get_bse_stock_close_previous_year', methods=['POST'])
def get_bse_stock_close_previous_year():
    try:
        data = request.json
        stock_symbols = data['stocks']
        stock_data = fetch_stock_data(stock_symbols)
        logger.info("Successfully fetched BSE stock close prices for the previous year from Yahoo Finance.")
        return jsonify(stock_data), 200
    except Exception as e:
        logger.error(f"Error fetching BSE stock close prices for the previous year: {str(e)}")
        return jsonify({'error': str(e)}), 400

def fetch_stock_data(stock_symbols):
    stock_data = {}
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)
    
    for symbol in stock_symbols:
        stock = yf.download(symbol + ".BO", start=start_date, end=end_date)
        stock_data[symbol] = {
            "symbol": symbol,
            "historical_close": []
        }
        for index, row in stock.iterrows():
            stock_data[symbol]["historical_close"].append({
                "date": index.strftime('%Y-%m-%d'),
                "close": row['Close']
            })
    return stock_data

stock_symbols = ['ABB.BO', 'ADANIGREEN.BO', 'ADANIPORTS.BO', 'ADANIPOWER.BO', 'ATGL.BO', 'AMBUJACEM.BO', 'APOLLOHOSP.BO', 'ASIANPAINT.BO', 'DMART.BO', 'AXISBANK.BO', 'BAJAJ-AUTO.BO', 'BAJFINANCE.BO', 'BAJAJFINSV.BO', 'BAJAJHLDNG.BO', 'BANKBARODA.BO', 'BERGEPAINT.BO', 'BEL.BO', 'BPCL.BO', 'BHARTIARTL.BO', 'BOSCHLTD.BO', 'BRITANNIA.BO', 'CANBK.BO', 'CHOLAFIN.BO', 'CIPLA.BO', 'COALINDIA.BO', 'COLPAL.BO', 'DLF.BO', 'DABUR.BO', 'DIVISLAB.BO', 'DRREDDY.BO', 'EICHERMOT.BO', 'GAIL.BO', 'GODREJCP.BO', 'GRASIM.BO', 'HCLTECH.BO', 'HDFCBANK.BO', 'HDFCLIFE.BO', 'HAVELLS.BO', 'HEROMOTOCO.BO', 'HINDALCO.BO', 'HAL.BO', 'HINDUNILVR.BO', 'ICICIBANK.BO', 'ICICIGI.BO', 'ICICIPRULI.BO', 'ITC.BO', 'IOC.BO', 'IRCTC.BO', 'IRFC.BO', 'INDUSINDBK.BO', 'NAUKRI.BO', 'INFY.BO', 'INDIGO.BO', 'JSWSTEEL.BO', 'JINDALSTEL.BO', 'JIOFIN.BO', 'KOTAKBANK.BO', 'LTIM.BO', 'LT.BO', 'LICI.BO', 'M&M.BO', 'MARICO.BO', 'MARUTI.BO', 'NTPC.BO', 'NESTLEIND.BO', 'ONGC.BO', 'PIDILITIND.BO', 'PFC.BO', 'POWERGRID.BO', 'PNB.BO', 'RECLTD.BO', 'RELIANCE.BO', 'SBICARD.BO', 'SBILIFE.BO', 'SRF.BO', 'MOTHERSON.BO', 'SHREECEM.BO', 'SHRIRAMFIN.BO', 'SIEMENS.BO', 'SBIN.BO', 'SUNPHARMA.BO', 'TVSMOTOR.BO', 'TCS.BO', 'TATACONSUM.BO', 'TATAMTRDVR.BO', 'TATAMOTORS.BO', 'TATAPOWER.BO', 'TATASTEEL.BO', 'TECHM.BO', 'TITAN.BO', 'TORNTPHARM.BO', 'TRENT.BO', 'ULTRACEMCO.BO', 'VBL.BO', 'VEDL.BO', 'WIPRO.BO', 'ZOMATO.BO', 'ZYDUSLIFE.BO']

@app.route('/stocks_curr')
def get_stock_prices():
    stock_data = {}
    for symbol in stock_symbols:
        stock = yf.Ticker(symbol)
        try:
            price = stock.history(period='1d')['Close'][0]
            stock_data[symbol.split('.')[0]] = round(price, 2)
        except Exception as e:
            stock_data[symbol] = str(e)
    return jsonify(stock_data)

@app.route('/calculate', methods=['POST'])
def calculate_stocks():
    try:
        data = request.json['stocks']
        results = []
        for stock in data:
            symbol = stock['symbol']
            qty = stock['qty']
            avg_price = stock['avg_price']

            stock_info = yf.Ticker(symbol + ".BO")
            current_price = stock_info.history(period='1d')['Close'].iloc[-1]
            previous_close = stock_info.info.get('previousClose')
            if previous_close is None:
                raise ValueError("Previous close price not available.")

            today_change_percent = ((current_price - previous_close) / previous_close) * 100
            total_change_percent = ((current_price - avg_price) / avg_price) * 100

            results.append({
                'symbol': symbol,
                'today_change_percent': round(today_change_percent, 2),
                'total_change_percent': round(total_change_percent, 2),
                'current_value': round(qty * current_price, 2)
            })

        total_current_value = sum(stock['current_value'] for stock in results)

        return jsonify({
            'individual_stocks': results,
            'total_current_value': round(total_current_value, 2)
        }), 200
    except Exception as e:
        logger.error(f"Error in calculate_stocks(): {str(e)}")
        return jsonify({'error': str(e)}), 400

def fetch_stockt(stock_symbols, num_days):
    # utc_now = datetime.now(pytz.utc)

    # # Print UTC date and time in the desired format
    # end_date_str = utc_now.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    # end_date = datetime.strptime(end_date_str, "%Y-%m-%d %H:%M:%S.%f")

    # # Calculate start date by subtracting num_days from end_date
    end_date=datetime.now()
    start_date = end_date - timedelta(days=num_days - 1)

    stock_data = []

    for i in range(num_days):
        current_date = start_date + timedelta(days=i)
        formatted_date = current_date.strftime('%Y-%m-%d')
        total_value = 0

        for stock in stock_symbols:
            try:
                ticker = yf.Ticker(f"{stock}.BO")
                history = ticker.history(start=current_date, end=current_date, period='1d')
                if not history.empty:
                    price = history['Close'].iloc[0]
                    total_value += float(stock_symbols[stock]) * price
            except Exception as e:
                print(f"Error fetching data for {stock}: {str(e)}")

        if total_value > 0:
            stock_data.append({'date': formatted_date, 'total_value': total_value})

    return stock_data


@app.route('/daysandgraph', methods=['POST'])
def calculate_total_value():
    try:
        data = request.json
        stock_symbols = data.get('stocks', {})
        num_days = data.get('num_days', 30)

        if not isinstance(stock_symbols, dict):
            raise ValueError("Stocks data should be in a dictionary format.")

        stock_data = fetch_stockt(stock_symbols, num_days)

        return jsonify(stock_data), 200
    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), 400
    
@app.route('/calculate_sts', methods=['POST'])
def calculate_sts():
    try:
        plans_data = request.json['plans_data']  # Assuming 'plans_data' is the key for plans_data list
        response_data = []

        for plan in plans_data:
            data = plan['stocks']
            results = []
            for stock in data:
                symbol = stock['symbol']
                qty = stock['qty']
                avg_price = stock['price']  # Assuming avg_price is the same as the buying price

                stock_info = yf.Ticker(symbol + ".BO")
                current_price = stock_info.history(period='1d')['Close'].iloc[-1]
                previous_close = stock_info.info.get('previousClose')
                if previous_close is None:
                    raise ValueError("Previous close price not available.")

                today_change_percent = ((current_price - previous_close) / previous_close) * 100
                total_change_percent = ((current_price - avg_price) / avg_price) * 100

                results.append({
                    'symbol': symbol,
                    'today_change_percent': round(today_change_percent, 2),
                    'total_change_percent': round(total_change_percent, 2),
                    'current_value': round(qty * current_price, 2)
                })

            total_current_value = sum(stock['current_value'] for stock in results)

            response_data.append({
                'planName': plan['planName'],
                'individual_stocks': results,
                'total_current_gains': round(((total_current_value+plan["cash"]-plan['startVal'])/plan['startVal'])*100, 2)
            })

        return jsonify({'plans_data': response_data}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)





