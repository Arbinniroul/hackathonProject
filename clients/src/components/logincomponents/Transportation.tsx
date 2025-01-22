import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TransportCostCalculatorProps {
  selectedRoute: any
  onCalculate: (details: any) => void
}

const TransportCostCalculator: React.FC<TransportCostCalculatorProps> = ({ selectedRoute, onCalculate }) => {
  const [weight, setWeight] = useState<string>("")
  const [transportType, setTransportType] = useState<string>("")
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null)

  useEffect(() => {
    setCalculatedCost(null)
  }, [selectedRoute])

  const calculateCost = () => {
    if (!selectedRoute || !weight || !transportType) return

    const distance = selectedRoute.summary.totalDistance / 1000 // Convert to km
    const baseCost = transportType === "truck" ? 50 : 30 // Cost per km (50 for truck, 30 for van)
    const fuelSurcharge = selectedRoute.summary.totalAscend > 500 ? 1.2 : 1 // 20% surcharge for hilly regions

    const totalCost = distance * baseCost * fuelSurcharge
    const costPerKg = totalCost / Number.parseFloat(weight)

    setCalculatedCost(totalCost)

    onCalculate({
      distance,
      totalCost,
      costPerKg,
      transportType,
      weight: Number.parseFloat(weight),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport Cost Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg):</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transport Type:</label>
          <Select onValueChange={setTransportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select transport type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="van">Van</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={calculateCost} className="w-full">
          Calculate Cost
        </Button>
        {calculatedCost !== null && (
          <div className="mt-4">
            <p className="font-semibold">Estimated Cost: NPR {calculatedCost.toFixed(2)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TransportCostCalculator

