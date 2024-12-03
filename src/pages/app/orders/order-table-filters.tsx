import { zodResolver } from '@hookform/resolvers/zod'
import { SelectValue } from '@radix-ui/react-select'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Gather the data inside the searchParams:
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    })

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')
      // don't forget to set he page to 1, otherwise
      // it'll remain in the same page and won't show any results

      return state
    })
  }

  function handleRemoveFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')

      state.set('page', '1')

      return state
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filters:</span>

      <Input
        placeholder="Order's ID"
        className="h-8 w-auto"
        {...register('orderId')}
      />

      <Input
        placeholder="Client's name"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      {/* 
          // The Radix UI Select component is a custom, controlled component that manages its own state internally. 
          // Unlike standard HTML elements (e.g., <input>, <select>, <textarea>), custom components do not expose 
          // a straightforward interface for react-hook-form to register and track their state. 
          // To bridge this gap, we use the Controller component from react-hook-form, which allows us to bind 
          // the Select's value and onChange handler to the form's state. This ensures the Select integrates seamlessly 
          // with react-hook-form, enabling state management, validation, and inclusion in the form's submission data. 
      */}
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="processing">Ongoing</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="sm">
        <Search className="h-3 w-3" />
        Filter results
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleRemoveFilters}
      >
        <X className="h-3 w-3" />
        Remove filters
      </Button>
    </form>
  )
}
