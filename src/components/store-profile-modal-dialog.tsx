import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export function StoreProfileModalDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Update the informations visible to your clients
        </DialogDescription>
      </DialogHeader>

      <form>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name:
            </Label>
            <Input className="col-span-3" id="name" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Description:
            </Label>
            <Textarea className="col-span-3" id="description" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
