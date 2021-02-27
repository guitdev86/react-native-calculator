import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from './components/Button';
import Screen from './components/Screen'

export default function App() {

  const [screen, setScreen] = useState('0');
  const [result, setResult] = useState('');

  const renderNumber = (i) => {
    return <Button onClick={addNumber} key={i} value={i} icon={i} color={'#1c2f3d'} />
  }

  const renderOperation = (i) => {
    return i === 'X' ? <Button onClick={makeOperation} key={i} value={'*'} icon={'X'} color={'#9c4e03'} /> : <Button onClick={makeOperation} key={i} value={i} icon={i} color={'#9c4e03'} />
  }

  const renderSqrt = () => {
    return <Button onClick={calculateSqrt} key={'√'} value={'√'} icon={'√'} color={'#9c4e03'} />
  }

  const renderPlusMinusSwitch = () => {
    return <Button onClick={switchPositiveNegative} key={'+/-'} value={'+/-'} icon={'+/-'} color={'#9c4e03'}/>
  }

  const renderReset = () => {
    return <Button onClick={resetCalculator} key={'AC'} value={'AC'} icon={'AC'} color={'#9c4e03'}/>
  }

  const renderResult = () => {
    return <Button onClick={printResult} key={'='} value={'='} icon={'='} color={'#1c2f3d'}/>
  }

  const renderPercentage = () => {
    return <Button onClick={calculatePercentage} key={'%'} value={'%'} icon={'%'} color={'#9c4e03'}/>
  }

  const calculatePercentage = () => {

    setScreen( trimResultLength(screen / 100) );
    setResult('');
  }

  const calculateSqrt = () => {
    if(result.length === 0) return setScreen('Err');

    let trimmedResult;

    if(hasOperatorAsLastSymbol(result)) {
      trimmedResult = trimResultLength(Math.sqrt(eval(result.substring(0, result.length - 1))))
      setScreen(trimmedResult);
    } else {
      trimmedResult = trimResultLength(Math.sqrt(eval(result)));
      setScreen(trimmedResult);
    }
    setResult('');
  }

  const resetCalculator = () => {
    setScreen('0');
    setResult('');
  }

  const switchPositiveNegative = () => {

    if(!result) return;

    let numbersOfResultInArray = result.match(/[0-9]?\w+/g);
    let singleNumberEntered = numbersOfResultInArray.length === 1;
    let hasMinus = screen.match(/\-/);
    let minusIsFirstElement = screen.indexOf('-') === 0;
    let resultIsNotEmpty = result.length > 0;

    if(singleNumberEntered) {
      if(hasMinus && minusIsFirstElement) {
        setScreen(screen.slice(1));
        setResult(result.slice(1));
      } else if (resultIsNotEmpty && singleNumberEntered) {
        setScreen('-'.concat(screen));
        setResult('-'.concat(result));
      }
    } else if (!singleNumberEntered) {
      const lastNumber = numbersOfResultInArray[numbersOfResultInArray.length - 1];
      if(minusIsFirstElement) {
        setScreen(screen.slice(1));
      } else {
        setScreen('-'.concat(screen));
      }
      
      setResult(result.replace(lastNumber, `(-${lastNumber})`));
    }
    

    //TODO proper functionality
  }

  const addNumber = symbol => {
    // if the symbol is being added to a empty line or a new number after an operation
    if(result === '' || result[result.length - 1].match(/[-+*/]/)) {
      //if yes then check if it is a dot
      if(symbol === '.') {
        //if it's a dot render '0.' line
        setScreen('0.');
      } else {
        //if it's not a dot then just render symbol on the screen
        setScreen(symbol);
      };
      //add symbol to the result line if it's not a "0"
      if(symbol !== '0') {
        setResult(result + symbol);
      }
    } else {
      // if symbol is dot, then check if dot is not already in the string and add it.
      if(symbol === '.') {
        if(screen.indexOf('.') < 0) {
          setScreen(screen + symbol);
          setResult(result + symbol);
        }
      } else if(symbol !== '.') { 
        // if symbol is being added to not an empty string then just add to both screen and result if it's not a dot
        setScreen(screen + symbol);
        setResult(result + symbol);
      } 
    }
  }

  const trimResultLength = (number) => {
    if(String(number).length > 11) {
      return Number.parseFloat(Number(number)).toPrecision(8);
    } else {
      return number;
    }
  }

  const makeOperation = operation => {
    if(result.length === 0) {
      setResult(screen + operation);
    } else if (hasOperatorAsLastSymbol(result)) {
      setResult(result.substring(0, result.length-1) + operation);
    } else {
      setResult(result + operation);
    } 
  }

  const printResult = () => {
    let trimmedString;

    if(hasOperatorAsLastSymbol(result)) {
          trimmedString = trimResultLength(eval(result.substring(0, result.length - 1)));
          setScreen(trimmedString);
        } else {
          trimmedString = trimResultLength(eval(result));
          setScreen(trimmedString);
          if(result === '') setScreen('0');
        }
    setResult('');
  }

  const hasOperatorAsLastSymbol = string => {
    return string.endsWith('+') || string.endsWith('-') ||
    string.endsWith('/') || string.endsWith('*')
  }

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Screen value={screen}></Screen>
      </View>
      <View style={styles.keyboard}>
        <View style={styles.keyboardRow}>
          {renderSqrt()}
          {renderPlusMinusSwitch()}
          {renderPercentage()}
          {renderReset()}
        </View>
        <View style={styles.keyboardRow}>
          {renderNumber('7')}
          {renderNumber('8')}
          {renderNumber('9')}
          {renderOperation('/')}
        </View>
        <View style={styles.keyboardRow}>
          {renderNumber('4')}
          {renderNumber('5')}
          {renderNumber('6')}
          {renderOperation('X')}
        </View>
        <View style={styles.keyboardRow}>
          {renderNumber('1')}
          {renderNumber('2')}
          {renderNumber('3')}
          {renderOperation('-')}
        </View>
        <View style={styles.keyboardRow}>
          {renderNumber('0')}
          {renderNumber('.')}
          {renderResult('=')}
          {renderOperation('+')}
        </View>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },

  screen: {
    marginHorizontal: 3,
    alignSelf: "stretch"
  },

  title: {
    paddingBottom: 20
  },

  keyboard: {
    marginTop: 20,
    alignSelf: "stretch"
  },

  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
