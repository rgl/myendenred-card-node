this lists all https://www.myedenred.pt/ cards transactions from the command line.

# Usage

Install dependencies:

```bash
npm install
```

Get the last cards transactions from the given username and password:

```bash
node main.js username password
```

**NB** Before use, you must first register your username and card at [myedenred.pt](https://www.myedenred.pt/).

**NB** Only the last 60 transactions will be returned.

This should output something like:

```
4339660100000000 RUI LOPES (ACME INC) balance 111.11
4339660100000000 2019-01-31T13:00:00.000+0000   -29.20 JUMBO
4339660100000000 2019-01-30T12:00:00.000+0000    -9.40 CARREFOUR
4339660100000000 2019-01-30T08:00:00.000+0000   123.00 Transferência Bancária
4339660100000000 2019-01-29T13:00:00.000+0000   -12.50 CONTINENTE
4339660100000000 2019-01-28T13:00:00.000+0000   -13.00 PINGO DOCE
4339660100000000 2019-01-25T13:00:00.000+0000   -11.66 LIDL
4339660100000000 2019-01-24T14:00:00.000+0000   -15.60 ALDI
4339660100000000 2019-01-22T12:00:00.000+0000    -7.00 IKEA
```
