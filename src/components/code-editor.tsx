import { EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import CodeMirror from '@uiw/react-codemirror'
import { useCallback, useEffect, useState } from 'react'
import { Linter } from 'eslint-linter-browserify'
import * as tsParser from '@typescript-eslint/parser'
import perfectionist from 'eslint-plugin-perfectionist'
import { javascript, esLint } from '@codemirror/lang-javascript'
import { linter } from '@codemirror/lint'
import { history } from '@codemirror/commands'
import { bracketMatching } from '@codemirror/language'
import { useTheme } from '@/lib/theme'

const eslint = new Linter({ configType: 'flat' })
const language = javascript({ jsx: true, typescript: true })
const config = {
  settings: {
    perfectionist: {
      type: 'natural'
    }
  },
  languageOptions: {
    parser: {
      meta: tsParser.meta,
      parseForESLint: tsParser.parseForESLint
    },
    ecmaVersion: 2020
  },
  plugins: {
    perfectionist
  },
  rules: {
    ...perfectionist.configs['recommended-natural'].rules,
    'perfectionist/sort-enums': [
      'error',
      {
        sortByValue: true
      }
    ]
  }
}
const linter_ = linter(esLint(eslint, config), { delay: 0 })
const extensions = [history(), bracketMatching(), linter_, language]

export const CodeEditor = () => {
  const [code, setCode] = useState('const a = 1;')
  const [fixedCode, setfixedCode] = useState(code)
  const { calculatedTheme } = useTheme()

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      const result = eslint.verifyAndFix(code, config)
      setfixedCode(result.output)
    }, 500)
    return () => clearTimeout(delayInputTimeoutId)
  }, [code])

  const onCodeChange = useCallback((value: string, _: any) => {
    setCode(value)
  }, [])

  return (
    <div className='flex flex-grow min-h-full border border-neutral-500'>
      <CodeMirror
        value={code}
        onChange={onCodeChange}
        extensions={extensions}
        className='w-1/2'
        theme={calculatedTheme as 'dark' | 'light'}
        minHeight='100%'
      />
      <CodeMirror
        value={fixedCode}
        extensions={[
          ...extensions,
          EditorView.editable.of(false),
          EditorState.readOnly.of(true)
        ]}
        className='w-1/2'
        theme={calculatedTheme as 'dark' | 'light'}
        minHeight='100%'
      />
    </div>
  )
}
