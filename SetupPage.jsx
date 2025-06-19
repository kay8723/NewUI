import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Progress } from './progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { 
  FolderOpen, 
  HardDrive, 
  Settings, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Download,
  Database
} from 'lucide-react'
import nyraLogo from "./nyra-logo.svg"

const SetupPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [setupData, setSetupData] = useState({
    installPath: '/Applications/Nyra',
    dataPath: '~/Documents/Nyra',
    enableTelemetry: true,
    autoStart: false
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate('/')
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete setup and navigate to main app
      navigate('/app')
    }
  }

  const handleInputChange = (field, value) => {
    setSetupData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const selectFolder = (type) => {
    // In a real Electron app, this would open a native folder dialog
    // For now, we'll simulate it
    const mockPath = type === 'install' ? '/Applications/Nyra' : '~/Documents/Nyra'
    handleInputChange(type === 'install' ? 'installPath' : 'dataPath', mockPath)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="liquidGlass-wrapper max-w-4xl w-full">
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <img 
                src={nyraLogo} 
                alt="Nyra Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Setup Nyra
              </h1>
              <p className="text-gray-600">
                Let's configure your AI assistant for the best experience
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Setup Steps */}
            <div className="min-h-[400px]">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Download className="w-5 h-5 text-blue-600" />
                        Installation Location
                      </CardTitle>
                      <CardDescription>
                        Choose where to install Nyra on your system
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="installPath" className="text-base font-medium">
                          Installation Directory
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="installPath"
                            value={setupData.installPath}
                            onChange={(e) => handleInputChange('installPath', e.target.value)}
                            className="flex-1"
                            placeholder="/Applications/Nyra"
                          />
                          <Button
                            variant="outline"
                            onClick={() => selectFolder('install')}
                            className="px-4"
                          >
                            <FolderOpen className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended: Use the default location for easy access
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Installation Requirements</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Minimum 2GB free disk space</li>
                          <li>• Administrator privileges may be required</li>
                          <li>• Internet connection for initial setup</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        Data Storage
                      </CardTitle>
                      <CardDescription>
                        Configure where Nyra will store your data and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="dataPath" className="text-base font-medium">
                          Data Directory
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="dataPath"
                            value={setupData.dataPath}
                            onChange={(e) => handleInputChange('dataPath', e.target.value)}
                            className="flex-1"
                            placeholder="~/Documents/Nyra"
                          />
                          <Button
                            variant="outline"
                            onClick={() => selectFolder('data')}
                            className="px-4"
                          >
                            <FolderOpen className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          This folder will contain your conversations, settings, and AI models
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <HardDrive className="w-4 h-4 text-green-600" />
                            <h4 className="font-medium text-green-900">Local Storage</h4>
                          </div>
                          <p className="text-sm text-green-800">
                            All data stays on your device for maximum privacy and security
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <h4 className="font-medium text-blue-900">Automatic Backup</h4>
                          </div>
                          <p className="text-sm text-blue-800">
                            Regular backups ensure your data is never lost
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        Preferences
                      </CardTitle>
                      <CardDescription>
                        Customize your Nyra experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Tabs defaultValue="general" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="general">General</TabsTrigger>
                          <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="general" className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Auto-start with system</h4>
                              <p className="text-sm text-gray-500">
                                Launch Nyra automatically when you start your computer
                              </p>
                            </div>
                            <Button
                              variant={setupData.autoStart ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleInputChange('autoStart', !setupData.autoStart)}
                            >
                              {setupData.autoStart ? 'Enabled' : 'Disabled'}
                            </Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="privacy" className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Anonymous telemetry</h4>
                              <p className="text-sm text-gray-500">
                                Help improve Nyra by sharing anonymous usage data
                              </p>
                            </div>
                            <Button
                              variant={setupData.enableTelemetry ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleInputChange('enableTelemetry', !setupData.enableTelemetry)}
                            >
                              {setupData.enableTelemetry ? 'Enabled' : 'Disabled'}
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Ready to Launch!</h4>
                        <p className="text-sm text-gray-700">
                          Nyra is configured and ready to be your intelligent AI assistant. 
                          Click "Complete Setup" to start your journey.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 1 ? 'Back to Welcome' : 'Previous'}
              </Button>

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2"
              >
                {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SetupPage

