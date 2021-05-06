import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'lib-evo-categories',
  templateUrl: './evo-categories.component.html',
  styleUrls: ['./evo-categories.component.scss'],
})
export class EvoCategoriesComponent implements OnInit, OnDestroy {

  private destroy$: Subject<any> = new Subject();

  @Input() data: any;
  @Input() dataIsObservable: boolean;
  @Input() sorting = true;
  @Input() title: string;
  @Input() countField = 'count';
  @Input() visibleCategories = 15;
  @Input() displayField = 'name';
  @Input() valueField = 'id';
  @Input() clearText = 'Clear Selection';
  @Input() emptySelectedText = 'Todos';
  @Input() loadingMask = true;
  @Input() filterField = '';
  @Output() filterData = new EventEmitter<object>();
  selection = new Set();
  showClearSection = true;
  showEmptyMessage = true;
  moreFilters = false;
  public sortedData$: BehaviorSubject<any> = new BehaviorSubject(null);
  public sortedData;
  public maxValue = 0;
  selectedCategories = new Set();
  totalSelected = 0;
  selectionMode = false;
  isLoading = true;

  constructor() {
  }

  ngOnInit(): void {
    if (this.dataIsObservable) {
      this.data
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res) {
            this.processData(res);
          }
        });
    } else {
      this.processData();
    }

    this.totalSelected = this.selectedCategories.size;
    this.selectionMode = this.totalSelected > 0;
  }

  processData(dataToProcess: any = null): void {
    let data = this.dataIsObservable ? dataToProcess[this.filterField] : this.data;
    if (this.sorting) {
      data = Array.isArray(data)
        ? data.sort((a, b) =>
          a[this.countField] < b[this.countField] ? 1 : -1
        )
        : [];

      // @FIXME: remove setTimeout
      setTimeout(() => {
        this.maxValue =
          data && Array.isArray(data) && data.length > 0
            ? data[0][this.countField]
            : 0;
      }, 25);
    } else {
      const counts = data.map(c => c.count);
      setTimeout(() => {
        this.maxValue =
          data && Array.isArray(data) && data.length > 0
            ? Math.max(...counts) : 0;
      }, 25);
    }

    this.isLoading = data.length === 0;

    this.sortedData$.next(data);
  }

  abbreviateNumber(num: any): any {
    const dictionary = [
      {
        value: 1e18,
        symbol: 'E',
      },
      {
        value: 1e15,
        symbol: 'P',
      },
      {
        value: 1e12,
        symbol: 'T',
      },
      {
        value: 1e9,
        symbol: 'B',
      },
      {
        value: 1e6,
        symbol: 'M',
        factor: 1000000,
      },
      {
        value: 1e3,
        symbol: 'k',
        factor: 1000,
      },
    ];
    let i;
    for (i = 0; i < dictionary.length; i++) {
      if (num >= dictionary[i].value) {
        return (num / dictionary[i].value).toFixed(1) + dictionary[i].symbol;
      }
    }
    return num;
  }

  setFilterParams(): void {
    const paramList = [];
    for (const id of this.selectedCategories) {
      paramList.push(id);
    }
    this.filterData.emit({
      filter: this.filterField,
      values: paramList,
    });
  }

  onSelectedCategory(item): void {
    const value = item[this.valueField];

    if (this.selectedCategories.has(value)) {
      this.removeFromSelection(value);
    } else {
      this.addToSelection(value);
    }

    this.totalSelected = this.selectedCategories.size;
    this.selectionMode = this.totalSelected > 0;
  }

  removeFromSelection(item): void {
    this.selectedCategories.delete(item);
    this.setFilterParams();
  }

  addToSelection(item): void {
    this.selectedCategories.add(item);
    this.setFilterParams();
  }

  clearSelection(): void {
    this.selectedCategories = new Set();
    this.totalSelected = this.selectedCategories.size;
    this.selectionMode = this.totalSelected > 0;
    this.setFilterParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}

