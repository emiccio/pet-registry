'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PawPrint, Syringe, Stethoscope, LineChart, Calendar, Plus } from 'lucide-react'
// import { Line } from 'react-chartjs-2'
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// )

type VaccineRecord = {
  name: string
  date: string
  nextDate: string
  veterinarian: string
}

type MedicalRecord = {
  date: string
  reason: string
  diagnosis: string
  treatment: string
}

type WeightRecord = {
  date: string
  weight: number
}

export default function VeterinaryNotebook() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [basicInfo, setBasicInfo] = useState({
    species: 'Dog',
    breed: 'Golden Retriever',
    birthDate: '2020-05-15',
    sex: 'Male',
    chipNumber: '123456789',
  })

  const [vaccines, setVaccines] = useState<VaccineRecord[]>([
    { name: 'Rabies', date: '2023-01-15', nextDate: '2024-01-15', veterinarian: 'Dr. Smith' },
    { name: 'Distemper', date: '2023-02-20', nextDate: '2024-02-20', veterinarian: 'Dr. Johnson' },
  ])

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    { date: '2023-03-10', reason: 'Annual checkup', diagnosis: 'Healthy', treatment: 'None required' },
    { date: '2023-06-05', reason: 'Limping', diagnosis: 'Sprained paw', treatment: 'Rest and anti-inflammatory medication' },
  ])

  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([
    { date: '2023-01-01', weight: 30 },
    { date: '2023-03-01', weight: 32 },
    { date: '2023-06-01', weight: 33 },
  ])

  const weightChartData = {
    labels: weightRecords.map(record => record.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightRecords.map(record => record.weight),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const weightChartOptions = {
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      }
    }
  }

  const renderContent = (title: string, content: React.ReactNode) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )

  const basicInfoContent = (
    <div className="space-y-2">
      {Object.entries(basicInfo).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</Label>
          <Input id={key} value={value} onChange={(e) => setBasicInfo({ ...basicInfo, [key]: e.target.value })} className="w-2/3" />
        </div>
      ))}
    </div>
  )

  const vaccinesContent = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Vaccines</h3>
        <Button size="sm" onClick={() => setVaccines([...vaccines, { name: '', date: '', nextDate: '', veterinarian: '' }])}>
          <Plus className="w-4 h-4 mr-2" /> Add Vaccine
        </Button>
      </div>
      {vaccines.map((vaccine, index) => (
        <Card key={index} className="mb-4 bg-white/50">
          <CardContent className="grid grid-cols-2 gap-2 pt-4">
            {Object.entries(vaccine).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={`vaccine-${index}-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</Label>
                <Input
                  id={`vaccine-${index}-${key}`}
                  value={value}
                  onChange={(e) => {
                    const newVaccines = [...vaccines]
                    newVaccines[index] = { ...newVaccines[index], [key]: e.target.value }
                    setVaccines(newVaccines)
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  )

  const medicalRecordsContent = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Medical Records</h3>
        <Button size="sm" onClick={() => setMedicalRecords([...medicalRecords, { date: '', reason: '', diagnosis: '', treatment: '' }])}>
          <Plus className="w-4 h-4 mr-2" /> Add Record
        </Button>
      </div>
      {medicalRecords.map((record, index) => (
        <Card key={index} className="mb-4 bg-white/50">
          <CardContent className="grid grid-cols-2 gap-2 pt-4">
            {Object.entries(record).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={`record-${index}-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</Label>
                {key === 'treatment' ? (
                  <Textarea
                    id={`record-${index}-${key}`}
                    value={value}
                    onChange={(e) => {
                      const newRecords = [...medicalRecords]
                      newRecords[index] = { ...newRecords[index], [key]: e.target.value }
                      setMedicalRecords(newRecords)
                    }}
                  />
                ) : (
                  <Input
                    id={`record-${index}-${key}`}
                    value={value}
                    onChange={(e) => {
                      const newRecords = [...medicalRecords]
                      newRecords[index] = { ...newRecords[index], [key]: e.target.value }
                      setMedicalRecords(newRecords)
                    }}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  )

  const weightContent = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Weight History</h3>
        <Button size="sm" onClick={() => setWeightRecords([...weightRecords, { date: '', weight: 0 }])}>
          <Plus className="w-4 h-4 mr-2" /> Add Weight
        </Button>
      </div>
      <div className="mb-4">
        {/* <Line data={weightChartData} options={weightChartOptions} /> */}
      </div>
      {weightRecords.map((record, index) => (
        <Card key={index} className="mb-2 bg-white/50">
          <CardContent className="flex justify-between items-center pt-4">
            <Input
              type="date"
              value={record.date}
              onChange={(e) => {
                const newRecords = [...weightRecords]
                newRecords[index] = { ...newRecords[index], date: e.target.value }
                setWeightRecords(newRecords)
              }}
            />
            <Input
              type="number"
              value={record.weight}
              onChange={(e) => {
                const newRecords = [...weightRecords]
                newRecords[index] = { ...newRecords[index], weight: parseFloat(e.target.value) }
                setWeightRecords(newRecords)
              }}
            />
            <span>kg</span>
          </CardContent>
        </Card>
      ))}
    </>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-100 to-pink-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <PawPrint className="w-6 h-6 mr-2 text-primary" />
          Veterinary Notebook
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="basic-info">
              <AccordionTrigger>Basic Info</AccordionTrigger>
              <AccordionContent>{basicInfoContent}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="vaccines">
              <AccordionTrigger>Vaccines</AccordionTrigger>
              <AccordionContent>{vaccinesContent}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="medical-records">
              <AccordionTrigger>Medical Records</AccordionTrigger>
              <AccordionContent>{medicalRecordsContent}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="weight">
              <AccordionTrigger>Weight</AccordionTrigger>
              <AccordionContent>{weightContent}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
              <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
            <TabsContent value="basic-info">{renderContent("Basic Information", basicInfoContent)}</TabsContent>
            <TabsContent value="vaccines">{renderContent("Vaccines", vaccinesContent)}</TabsContent>
            <TabsContent value="medical-records">{renderContent("Medical Records", medicalRecordsContent)}</TabsContent>
            <TabsContent value="weight">{renderContent("Weight History", weightContent)}</TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

