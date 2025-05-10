import React, { useEffect, useState } from 'react';
import { ROUTES }from '../const';
import Button   from '../components/Button/Button';
import Display  from '../components/Display/Display';
import quizData from '../data/quiz';
import { useNavigate } from 'react-router-dom';
export default function QuizPage() {
  const [ quizIndex, setQuizIndex ] = useState( 0 );
  const [ answerLogs, setAnswerLogs ] = useState( [] );
  const navigation = useNavigate();
  const MAX_QUIZ_LEN = quizData.length;

  const handleClick = ( clickedIndex ) => {
    if ( clickedIndex === quizData[ quizIndex ].answerIndex ) {
      setAnswerLogs( prev => [ ...prev, true ] ); //... ← スプレッド構文 配列データに true を追加する
    } else {
      setAnswerLogs( prev => [ ...prev, false ] );//... ← スプレッド構文 配列データに false を追加する
    }
    setQuizIndex ( prev => prev + 1 ); //現在の State の値に対して１を足す （ 関数型更新: Functional Update ）
  }

  useEffect( () => {
    if ( answerLogs.length === MAX_QUIZ_LEN ) {
      const correctNum = answerLogs.filter( answer => answer === true );
      navigation( ROUTES.RESULT, {
        state: {
          maxQuizLen: MAX_QUIZ_LEN,
          correctNumLen: correctNum.length
        }
      } );
    }
  }, [ answerLogs, MAX_QUIZ_LEN, navigation ] );

  return (
    <>
      { quizData[quizIndex] && <Display>{ `Q${quizIndex + 1}. ${ quizData[quizIndex].question } ` }</Display> }
      <br />
      { quizData[quizIndex] && quizData[quizIndex].options.map( ( option, index ) =>
        <Button key={ `option-${ index }` } onClick={ () => { handleClick( index ) } }>{ option }</Button>
      ) }
    </>
  )
}
